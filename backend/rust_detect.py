import cv2
import numpy as np
import sys

def rust_detect(input_file, output_file):
    img = cv2.imread(input_file)
    if img is None:
        print(f"Error: Unable to load image {input_file}")
        return
    
    img_hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    
    # Range for lower red
    lower_red = np.array([0, 70, 70])
    upper_red = np.array([20, 200, 150])
    mask0 = cv2.inRange(img_hsv, lower_red, upper_red)
    
    # Range for upper red
    lower_red = np.array([170, 70, 70])
    upper_red = np.array([180, 200, 150])
    mask1 = cv2.inRange(img_hsv, lower_red, upper_red)
    
    # Combine masks
    mask = mask0 + mask1
    
    # Apply the mask to the image
    output_img = cv2.bitwise_and(img, img, mask=mask)
    
    # Save the processed image
    cv2.imwrite(output_file, output_img)
    print(f"Processed image saved as {output_file}")

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python rust_detect.py <input_image> <output_image>")
    else:
        rust_detect(sys.argv[1], sys.argv[2])
