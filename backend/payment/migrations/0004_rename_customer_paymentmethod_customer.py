# Generated by Django 3.2.9 on 2021-12-02 15:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('payment', '0003_order_paymentmethod'),
    ]

    operations = [
        migrations.RenameField(
            model_name='paymentmethod',
            old_name='Customer',
            new_name='customer',
        ),
    ]
