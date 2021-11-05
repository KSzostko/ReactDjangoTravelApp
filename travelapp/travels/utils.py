import datetime


def convert_to_date(date_time):
    return datetime.datetime.strftime(date_time, "%Y-%m-%d")
