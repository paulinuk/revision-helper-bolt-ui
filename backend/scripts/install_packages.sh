#!/bin/bash

# Define the virtual environment directory
VENV_DIR="../venv"

# Remove the existing virtual environment if it exists
if [ -d "$VENV_DIR" ]; then
  echo "Removing existing virtual environment..."
  rm -rf "$VENV_DIR"
fi

# Create a new virtual environment
echo "Creating a new virtual environment..."
python -m venv "$VENV_DIR"

# Check if the virtual environment was created successfully
if [ ! -d "$VENV_DIR" ]; then
  echo "Failed to create virtual environment. Please ensure Python is installed and accessible."
  exit 1
fi

# Activate the virtual environment
source "$VENV_DIR/Scripts/activate"

# Install required packages
echo "Installing packages..."
pip install -r ../requirements.txt

echo "Package installation complete. You can now start the application using run_app.sh."
