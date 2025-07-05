import os
import requests
import zipfile
import io
import shutil

def download_and_update_ckeditor():
    # URL for CKEditor 4.25.1-lts
    url = "https://github.com/ckeditor/ckeditor4/archive/refs/tags/4.25.1-lts.zip"
    
    # Create a temporary directory
    temp_dir = "temp_ckeditor"
    os.makedirs(temp_dir, exist_ok=True)
    
    try:
        # Download the zip file
        print("Downloading CKEditor 4.25.1-lts...")
        response = requests.get(url)
        response.raise_for_status()
        
        # Extract the zip file
        print("Extracting files...")
        with zipfile.ZipFile(io.BytesIO(response.content)) as zip_ref:
            zip_ref.extractall(temp_dir)
        
        # Source and destination paths
        source_dir = os.path.join(temp_dir, "ckeditor4-4.25.1-lts")
        dest_dir = "staticfiles/ckeditor/ckeditor"
        
        # Create destination directory if it doesn't exist
        os.makedirs(dest_dir, exist_ok=True)
        
        # Copy the files
        print("Updating CKEditor files...")
        for item in os.listdir(source_dir):
            s = os.path.join(source_dir, item)
            d = os.path.join(dest_dir, item)
            if os.path.isdir(s):
                shutil.copytree(s, d, dirs_exist_ok=True)
            else:
                shutil.copy2(s, d)
        
        print("CKEditor has been successfully updated to version 4.25.1-lts!")
        
    except Exception as e:
        print(f"An error occurred: {str(e)}")
    finally:
        # Clean up
        if os.path.exists(temp_dir):
            shutil.rmtree(temp_dir)

if __name__ == "__main__":
    download_and_update_ckeditor() 