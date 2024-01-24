# CSV to MySQL Dataloader

Welcome to the CSV to MySQL Dataloader, a Node.js application for effortlessly populating your MySQL database with data from CSV files.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before you begin, make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- [MySQL](https://www.mysql.com/) Database Server

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/csv-to-mysql-populator.git
   ```

2. Navigate to the project directory:

   ```bash
   cd csv-dataloader
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## Configuration

Create a .env file to set up your MySQL database connection details:

    ```bash
    DB_HOST=your_db_host
    DB_USER=your_db_user
    DB_PASS=your_db_password
    DB_NAME=your_db_name
    DB_PORT=your_db_port

    CSV_PATH=absolute_address_to_your_csv_file
    ```

## Usage

Create a MySQL database and configure the connection details in .env file as explained in the previous step.

Prepare your CSV file with the data you want to populate.

Configure the absolute address of your csv in the .env file as explained in the previous step.

Run the application:

    ```bash
    npm start
    ```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details