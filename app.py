from flask import Flask, render_template, request, redirect, url_for, jsonify
from flask_sqlalchemy import SQLAlchemy
import os
import json
import plotly.graph_objs as go
import plotly.utils  # ✅ Needed to fix JSON serialization issues

# Initialize Flask app
app = Flask(__name__)

# Define database path
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{os.path.join(basedir, "inventory.db")}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize database
db = SQLAlchemy(app)

# Define the Product model
class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)

# Home route - Displays the inventory dashboard
@app.route('/')
def index():
    products = Product.query.all()

    # Ensure there are products before generating chart data
    if products:
        product_names = [p.name for p in products]
        product_quantities = [p.quantity for p in products]

        # Create a bar chart
        chart = go.Figure([go.Bar(x=product_names, y=product_quantities)])

        # Fix: Ensure layout is properly defined
        chart.update_layout(
            title="Inventory Levels",
            xaxis_title="Product Name",
            yaxis_title="Quantity",
            paper_bgcolor="white",
            plot_bgcolor="white"
        )

        # ✅ Convert chart to JSON properly
        chart_json = json.dumps(chart, cls=plotly.utils.PlotlyJSONEncoder)
    else:
        chart_json = json.dumps({})  # ✅ Return an empty JSON object if no products exist

    return render_template('index.html', products=products, chart_json=chart_json)

# Route to add a product
@app.route('/add', methods=['POST'])
def add_product():
    name = request.form['name']
    quantity = request.form['quantity']
    price = request.form['price']

    new_product = Product(name=name, quantity=quantity, price=price)

    db.session.add(new_product)
    db.session.commit()

    return redirect(url_for('index'))

# Route to delete a product
@app.route('/delete/<int:product_id>', methods=['POST'])
def delete_product(product_id):
    product = Product.query.get(product_id)
    if product:
        db.session.delete(product)
        db.session.commit()
    return redirect(url_for('index'))

# Route to restock a product
@app.route('/restock/<int:product_id>', methods=['POST'])
def restock_product(product_id):
    try:
        data = request.get_json()  # Get the data sent from frontend (new quantity)
        new_quantity = data.get('quantity')

        # Ensure the quantity is valid (numeric and non-negative)
        if new_quantity is not None and isinstance(new_quantity, (int, float)) and new_quantity >= 0:
            product = Product.query.get(product_id)
            if product:
                product.quantity = new_quantity
                db.session.commit()  # Commit the changes to the database
                return jsonify({'success': True})  # Return success response
            else:
                return jsonify({'success': False, 'message': 'Product not found.'}), 404
        else:
            return jsonify({'success': False, 'message': 'Invalid quantity.'}), 400  # Invalid quantity

    except Exception as e:
        # Log the error and return a failure response
        print(f"Error: {e}")
        return jsonify({'success': False, 'message': 'Error processing the request.'}), 500

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
