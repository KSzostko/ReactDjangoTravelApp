# Generated by Django 3.2.4 on 2021-08-21 13:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('attractions', '0007_auto_20210821_1508'),
    ]

    operations = [
        migrations.AddField(
            model_name='attraction',
            name='xid',
            field=models.CharField(default='abc', max_length=50, unique=True),
            preserve_default=False,
        ),
    ]