from django.db import models


class BattedBall(models.Model):
    date = models.DateField()
    gamepk = models.IntegerField()
    hometeamid = models.IntegerField()
    hometeamname = models.CharField(max_length=64)
    awayteamid = models.IntegerField()
    awayteamname = models.CharField(max_length=64)
    parkid = models.IntegerField()
    park = models.CharField(max_length=64)
    batterid = models.IntegerField()
    battername = models.CharField(max_length=64)
    batside = models.CharField(max_length=64)
    batterteamid = models.CharField(max_length=64)
    pitcherid = models.IntegerField()
    pitchername = models.CharField(max_length=64)
    pitcherteamid = models.IntegerField()
    pitchside = models.CharField(max_length=64)
    balls = models.IntegerField()
    strikes = models.IntegerField()
    result_type = models.CharField(max_length=64)
    pitch_type = models.CharField(max_length=64)
    pitch_speed = models.IntegerField()
    zone_location_x = models.IntegerField()
    zone_location_z = models.IntegerField()
    launch_speed = models.IntegerField()
    launch_vert_ang = models.IntegerField()
    launch_horiz_ang = models.IntegerField()
    landing_location_x = models.IntegerField()
    landing_location_y = models.IntegerField()
    hang_time = models.IntegerField()

    class Meta:
        db_table = 'batted_ball'
