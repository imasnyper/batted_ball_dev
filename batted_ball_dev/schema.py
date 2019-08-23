import graphene

import batted_ball.schema


class Query(batted_ball.schema.Query, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query)