import datetime

import graphene
from django.db.models import Q
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField

from .models import BattedBall


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
    distinct_batters = DjangoFilterConnectionField(BattedBallNode)
    batted_balls_between_dates = DjangoFilterConnectionField(
        BattedBallNode,
        date_range=graphene.List(graphene.String),
    )

    def resolve_batted_balls_between_dates(self, args, **kwargs):
        date_range = kwargs.get("date_range", ["2017-04-01", "2017-04-05"])
        qs = BattedBall.objects.filter(
            Q(date__gte=date_range[0]) &
            Q(date__lt=date_range[1])
        )
        return qs

    # TODO change database to postgres for unique on field capability
    # otherwise this hackey workaround is needed.
    def resolve_distinct_batters(self, info):
        batted_balls = []
        all_batted_balls = BattedBall.objects.order_by("battername")
        for bb in all_batted_balls:
            if len(batted_balls) > 0:
                if bb.battername not in [b.battername for b in batted_balls]:
                    batted_balls.append(bb)
            else:
                batted_balls.append(bb)

        return batted_balls

