import csv
import os


def read_csv(path):
  with open(path, 'r', encoding='utf-8') as csvfile:
    reader = csv.reader(csvfile, delimiter=',')
    header = next(reader)
    data = []
    for row in reader:
      iterable = zip(header, row)
      country_dict = {key: value for key, value in iterable}
      data.append(country_dict)
    return data


if __name__ == '__main__':
  base_dir = os.path.dirname(__file__)
  data_path = os.path.join(base_dir, 'data.csv')
  data = read_csv(data_path)
  if len(data) > 0:
    print(data[0])
  else:
    print('No se encontraron filas en', data_path)