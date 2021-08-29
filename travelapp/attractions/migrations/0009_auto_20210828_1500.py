# Generated by Django 3.2.4 on 2021-08-28 13:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('attractions', '0008_attraction_xid'),
    ]

    operations = [
        migrations.AlterField(
            model_name='attraction',
            name='name',
            field=models.CharField(max_length=100, unique=True),
        ),
        migrations.AlterField(
            model_name='attraction',
            name='type',
            field=models.CharField(max_length=300),
        ),
    ]