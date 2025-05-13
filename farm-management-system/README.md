# Farm Management System

## Overview
The Farm Management System is a SaaS application designed to help farmers manage their dairy cattle operations efficiently. This application allows farmers to track milk sales, monitor animal health, and manage feed inventory.

## Features
- **Milk Tracking**: Farmers can add vendors and record the liters of milk sold to each vendor. The application calculates the total earnings based on a fixed price per liter.
- **Animal Health Tracking**: Farmers can track deworming and vaccination dates for their cows, ensuring they maintain the health of their livestock.
- **Feed Inventory Management**: The application allows farmers to track the animal feeds purchased, manage inventory, and record expenses related to feed.

## Technology Stack
- **Backend**: Django
- **Frontend**: React
- **Database**: SQLite (default for Django, can be changed in settings)

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   cd farm-management-system
   ```

2. Navigate to the backend directory and install the required packages:
   ```
   cd backend
   pip install -r requirements.txt
   ```

3. Run migrations to set up the database:
   ```
   python manage.py migrate
   ```

4. Start the Django development server:
   ```
   python manage.py runserver
   ```

5. In a new terminal, navigate to the frontend directory and install the React dependencies:
   ```
   cd frontend
   npm install
   ```

6. Start the React development server:
   ```
   npm start
   ```

## Usage
- Access the application through your web browser at `http://localhost:3000`.
- Use the Milk Tracking feature to add vendors and record milk sales.
- Track animal health by entering deworming and vaccination dates.
- Manage feed inventory and expenses effectively.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.