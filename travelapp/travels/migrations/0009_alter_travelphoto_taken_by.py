# Generated by Django 3.2.4 on 2021-10-09 14:11

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('travels', '0008_auto_20210905_1203'),
    ]

    operations = [
        migrations.AlterField(
            model_name='travelphoto',
            name='taken_by',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
