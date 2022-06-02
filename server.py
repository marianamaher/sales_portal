from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)


current_id = 4
sales = [
    {
    "id": 1,
    "salesperson": "James D. Halpert",
    "client": "Shake Shack",
    "reams": 1000
    },
    {
    "id": 2,
    "salesperson": "Stanley Hudson",
    "client": "Toast",
    "reams": 4000
    },
    {
    "id": 3,
    "salesperson": "Michael G. Scott",
    "client": "Computer Science Department",
    "reams": 10000
    },
]

clients = [
    "Shake Shack",
    "Toast",
    "Computer Science Department",
    "Teacher's College",
    "Starbucks",
    "Subsconsious",
    "Flat Top",
    "Joe's Coffee",
    "Max Caffe",
    "Nussbaum & Wu",
    "Taco Bell",
];

# ROUTES


@app.route('/')
def welcome():
   return render_template('welcome.html')   


@app.route('/infinity')
def infinity(sales=sales, clients=clients):
    return render_template('log_sales.html', sales=sales, clients=clients)  


# AJAX FUNCTIONS

# ajax for save_sale
@app.route('/save_sale', methods=['GET', 'POST'])
def save_sale(): 
    global sales
    global clients
    global current_id
    
    json_data = request.get_json()

    current_id += 1
    salesperson = json_data["salesperson"]
    client = json_data["client"]
    if client not in clients:
        clients.append(client);
    reams = json_data["reams"]
    

    
    new_name_entry = {

        "id": current_id,
        "salesperson": salesperson,
        "client":  client,
        "reams":  reams

    }

    sales.insert(0,new_name_entry)

    return jsonify(sales = sales, clients=clients)


#ajax for delete_sale 

@app.route('/delete_sale', methods=['GET', 'POST'])
def delete_sale(): 
        global sales
        global current_id
        
        
        json_data = request.get_json()

        current_id = json_data
        

        for i in range (0, len(sales)):
            if(sales[i]["id"] == (current_id)):
                sales.pop(i);
                break;


        return jsonify(sales=sales)
 


if __name__ == '__main__':
   app.run(debug = True)




