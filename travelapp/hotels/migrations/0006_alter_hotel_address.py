# Generated by Django 3.2.8 on 2021-11-02 20:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hotels', '0005_hotel_xid'),
    ]

    operations = [
        migrations.AlterField(
            model_name='hotel',
            name='address',
            field=models.CharField(max_length=300),
        ),
    ]