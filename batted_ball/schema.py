import datetime

import graphene
from django.db.models import Q
from django_filters import OrderingFilter, FilterSet
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField

from .models import Team, Park, Player, Batter, Pitcher, BattedBall


RESULT_TYPES = ["single", "double", "triple", "home_run", "hit_by_pitch", "field_out", "force_out", "sac_fly"]


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
    get_batter_team_names = DjangoFilterConnectionField(
        TeamNode,
        sort=graphene.String(),
        batters=graphene.List(graphene.String),
    )
    get_batters = DjangoFilterConnectionField(
        BatterNode,
        sort=graphene.String(),
        batters=graphene.List(graphene.String),
    )
    get_pitchers = DjangoFilterConnectionField(
        PitcherNode,
        sort=graphene.String(),
        pitchers=graphene.List(graphene.String),
    )
    get_pitcher_teams_names = DjangoFilterConnectionField(
        PitcherNode,
        sort=graphene.String(),
        pitcherTeams=graphene.List(graphene.String),
    )
    batted_balls = DjangoFilterConnectionField(
        BattedBallNode,
        filterset_class=BattedBallFilter,
        date_range=graphene.List(graphene.String),
        batters=graphene.List(graphene.String),
        pitchers=graphene.List(graphene.String),
        pitcherTeams=graphene.List(graphene.String),
        batterTeams=graphene.List(graphene.String),
        resultTypes=graphene.List(graphene.String),
    )

    def resolve_get_batters(self, args, **kwargs):
        all_batter_names = [b.player.name for b in Batter.objects.all()]
        sort = kwargs.get("sort", "player__name")
        batters = kwargs.get("batters", all_batter_names)
        qs = Batter.objects.filter(player__name__in=batters).order_by(sort)
        return qs

    def resolve_get_batting_team_names(self, args, **kwargs):
        all_batting_team_names = list(set([b.player.team.name for b in Batter.objects.all()]))
        sort = kwargs.get("sort", "name")
        team_names = kwargs.get("batters", all_batting_team_names)
        qs = Team.objects.filter(name__in=team_names).order_by(sort)
        return qs

    def resolve_get_pitchers(self, args, **kwargs):
        all_pitcher_names = [b.player.name for b in Pitcher.objects.all()]
        sort = kwargs.get("sort", "player__name")
        pitchers = kwargs.get("pitchers", all_pitcher_names)
        qs = Pitcher.objects.filter(player__name__in=pitchers).order_by(sort)
        return qs

    def resolve_get_pitching_team_names(self, args, **kwargs):
        all_pitching_team_names = list(set([b.player.team.name for b in Pitcher.objects.all()]))
        sort = kwargs.get("sort", "name")
        team_names = kwargs.get("pitching", all_pitching_team_names)
        qs = Team.objects.filter(name__in=team_names).order_by(sort)
        return qs

    def resolve_batted_balls(self, args, **kwargs):
        all_batters_names = [b.player.name for b in Batter.objects.all()]
        all_pitchers_names = [p.player.name for p in Pitcher.objects.all()]
        all_teams = Team.objects.all()
        date_range = kwargs.get("date_range", ["2017-04-01", "2017-04-05"])
        batters = kwargs.get("batters", all_batters_names)
        pitchers = kwargs.get("pitchers", all_pitchers_names)
        pitcher_teams = kwargs.get("pitcherTeams", all_teams)
        batter_teams = kwargs.get("batterTeams", all_teams)
        result_types = kwargs.get("resultTypes", RESULT_TYPES)
        qs = BattedBall.objects\
            .filter(
                Q(date__gte=date_range[0]) &
                Q(date__lt=date_range[1])
            ) \
            .filter(batter__player__name__in=batters) \
            .filter(pitcher__player__name__in=pitchers) \
            .filter(pitcher__player__team__name__in=list(pitcher_teams)) \
            .filter(batter__player__team__name__in=list(batter_teams)) \
            .filter(result_type__in=result_types)
        return qs
