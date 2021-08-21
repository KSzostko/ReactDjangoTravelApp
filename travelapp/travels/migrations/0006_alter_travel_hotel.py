# Generated by Django 3.2.4 on 2021-08-21 13:08

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('hotels', '0003_alter_hotel_id'),
        ('travels', '0005_alter_travel_hotel'),
    ]

    operations = [
        migrations.AlterField(
            model_name='travel',
            name='hotel',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='hotels.hotel'),
        ),
    ]
