import graphene
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField

from .models import BattedBall


class BattedBallNode(DjangoObjectType):
    class Meta:
        model = BattedBall
        interfaces = (graphene.relay.Node, )
        filter_fields = '__all__'


class Query(graphene.ObjectType):
    batted_ball = graphene.relay.Node.Field(BattedBallNode)
    all_batted_balls = DjangoFilterConnectionField(BattedBallNode)