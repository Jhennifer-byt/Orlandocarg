# Generated by Django 5.0.7 on 2024-08-08 06:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_guiatransportista_numero_guia'),
    ]

    operations = [
        migrations.AddField(
            model_name='guiatransportista',
            name='cantidad',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='guiatransportista',
            name='estado',
            field=models.CharField(choices=[('pendiente', 'Pendiente'), ('enviado', 'Enviado')], default='pendiente', max_length=10),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='guiatransportista',
            name='peso',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='guiatransportista',
            name='volumen',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
            preserve_default=False,
        ),
    ]
