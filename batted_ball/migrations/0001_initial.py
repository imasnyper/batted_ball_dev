# Generated by Django 2.2.4 on 2019-08-22 23:06

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='BattedBall',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.TextField(blank=True, null=True)),
                ('gamepk', models.TextField(blank=True, null=True)),
                ('hometeamid', models.TextField(blank=True, null=True)),
                ('hometeamname', models.TextField(blank=True, null=True)),
                ('awayteamid', models.TextField(blank=True, null=True)),
                ('awayteamname', models.TextField(blank=True, null=True)),
                ('parkid', models.TextField(blank=True, null=True)),
                ('park', models.TextField(blank=True, null=True)),
                ('batterid', models.TextField(blank=True, null=True)),
                ('battername', models.TextField(blank=True, null=True)),
                ('batside', models.TextField(blank=True, null=True)),
                ('batterteamid', models.TextField(blank=True, null=True)),
                ('pitcherid', models.TextField(blank=True, null=True)),
                ('pitchername', models.TextField(blank=True, null=True)),
                ('pitcherteamid', models.TextField(blank=True, null=True)),
                ('pitchside', models.TextField(blank=True, null=True)),
                ('balls', models.TextField(blank=True, null=True)),
                ('strikes', models.TextField(blank=True, null=True)),
                ('result_type', models.TextField(blank=True, null=True)),
                ('pitch_type', models.TextField(blank=True, null=True)),
                ('pitch_speed', models.TextField(blank=True, null=True)),
                ('zone_location_x', models.TextField(blank=True, null=True)),
                ('zone_location_z', models.TextField(blank=True, null=True)),
                ('launch_speed', models.TextField(blank=True, null=True)),
                ('launch_vert_ang', models.TextField(blank=True, null=True)),
                ('launch_horiz_ang', models.TextField(blank=True, null=True)),
                ('landing_location_x', models.TextField(blank=True, null=True)),
                ('landing_location_y', models.TextField(blank=True, null=True)),
                ('hang_time', models.TextField(blank=True, null=True)),
            ],
            options={
                'db_table': 'batted_ball',
            },
        ),
    ]
