# Generated by Django 3.1.7 on 2021-03-13 09:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('attractions', '0002_attraction_photo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='attraction',
            name='photo',
            field=models.ImageField(default='no-photo-available.png', upload_to='attractions/'),
        ),
    ]