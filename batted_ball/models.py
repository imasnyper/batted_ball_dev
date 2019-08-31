from django.db import models


class Team(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=64)


class Park(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=64)


class Player(models.Model):
    RIGHT = "R"
    LEFT = "L"
    BAT_THROW_SIDE = [(RIGHT, "Right"), (LEFT, "Left")]

    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=64)
    team = models.ForeignKey(Team, on_delete=models.CASCADE, null=True)
    side = models.CharField(max_length=1, choices=BAT_THROW_SIDE, null=True)


class Batter(models.Model):
    player = models.ForeignKey(Player, on_delete=models.CASCADE, null=True)


class Pitcher(models.Model):
    player = models.ForeignKey(Player, on_delete=models.CASCADE, null=True)


class BattedBall(models.Model):
    date = models.DateField()
    gamepk = models.IntegerField()
    home_team = models.ForeignKey(
        Team, on_delete=models.CASCADE, null=True, related_name="home")
    away_team = models.ForeignKey(
        Team, on_delete=models.CASCADE, null=True, related_name="away")
    park = models.ForeignKey(Park, on_delete=models.CASCADE, null=True)
    batter = models.ForeignKey(Batter, on_delete=models.CASCADE, null=True)
    pitcher = models.ForeignKey(Pitcher, on_delete=models.CASCADE, null=True)
    balls = models.IntegerField()
    strikes = models.IntegerField()
    result_type = models.CharField(max_length=64)
    pitch_type = models.CharField(max_length=64)
    pitch_speed = models.IntegerField()
    zone_location_x = models.FloatField()
    zone_location_z = models.FloatField()
    launch_speed = models.FloatField()
    launch_vert_ang = models.FloatField()
    launch_horiz_ang = models.FloatField()
    landing_location_x = models.FloatField()
    landing_location_y = models.FloatField()
    hang_time = models.FloatField()

    class Meta:
        db_table = 'batted_ball'
