import datetime

import graphene
from django.db.models import Q
from django_filters import OrderingFilter, FilterSet
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField

from .models import Team, Park, Player, Batter, Pitcher, BattedBall


class TeamNode(DjangoObjectType):
    class Meta:
        model = Team
        interfaces = (graphene.relay.Node,)
        filter_fields = '__all__'


class ParkNode(DjangoObjectType):
    class Meta:
        model = Park
        interfaces = (graphene.relay.Node,)
        filter_fields = '__all__'


class PlayerNode(DjangoObjectType):
    class Meta:
        model = Player
        interfaces = (graphene.relay.Node,)
        filter_fields = '__all__'


class PlayerFilter(FilterSet):
    class Meta:
        model = Player
        fields = "__all__"

    order_by = OrderingFilter(
        fields=(
            ('name'),
        )
    )


class BatterNode(DjangoObjectType):
    class Meta:
        model = Batter
        interfaces = (graphene.relay.Node,)
        filter_fields = ['player']


class PitcherNode(DjangoObjectType):
    class Meta:
        model = Pitcher
        interfaces = (graphene.relay.Node,)
        filter_fields = '__all__'


class BattedBallFilter(FilterSet):
    class Meta:
        model = BattedBall
        fields = "__all__"

    order_by = OrderingFilter(
        fields=(
            ("date", "-date")
        )
    )


class BattedBallNode(DjangoObjectType):
    class Meta:
        model = BattedBall
        interfaces = (graphene.relay.Node,)
        filter_fields = '__all__'

    @classmethod
    def get_node(cls, info, id):
        return BattedBall.objects.get(id)


class Query(graphene.ObjectType):
    batted_ball = graphene.relay.Node.Field(BattedBallNode)
    all_batted_balls = DjangoFilterConnectionField(BattedBallNode)
    all_players = DjangoFilterConnectionField(PlayerNode)
    get_batters = DjangoFilterConnectionField(
        BatterNode,
        sort=graphene.String(),
        batters=graphene.List(graphene.String)
    )
    batted_balls_between_dates = DjangoFilterConnectionField(
        BattedBallNode,
        filterset_class=BattedBallFilter,
        date_range=graphene.List(graphene.String),
        batters=graphene.List(graphene.String),
    )

    def resolve_get_batters(self, args, **kwargs):
        all_batter_names = [b.player.name for b in Batter.objects.all()]
        sort = kwargs.get("sort", "player__name")
        batters = kwargs.get("batters", all_batter_names)
        qs = Batter.objects.filter(player__name__in=batters).order_by(sort)
        return qs

    def resolve_batted_balls_between_dates(self, args, **kwargs):
        all_batters_names = [b.player.name for b in Batter.objects.all()]
        date_range = kwargs.get("date_range", ["2017-04-01", "2017-04-05"])
        batters = kwargs.get("batters", all_batters_names)
        qs = BattedBall.objects\
            .filter(
                Q(date__gte=date_range[0]) &
                Q(date__lt=date_range[1])
            )\
            .filter(batter__player__name__in=batters)
        return qs

