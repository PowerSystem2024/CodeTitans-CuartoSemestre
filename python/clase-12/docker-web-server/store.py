import requests

def get_razas():

    r = requests.get('https://dog.ceo/api/breeds/list')
    

    print(r.status_code)
    
    razas = r.json()
    
    for raza in razas.values():
        # print(f"Raza de los perritos: {raza[5]}")
        print(f"Raza de los perritos: {raza}")
