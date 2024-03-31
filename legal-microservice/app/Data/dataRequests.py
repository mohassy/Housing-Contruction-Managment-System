def get_location_access_type(input_arr) -> list:
    csv_file = "LegalMS_data.csv"  # Replace with your actual CSV file path
    result_arr = []
    with open(csv_file, 'r') as f:
        # Skip the header row (assuming the first row contains column names)
        next(f)
        for line in f:
            location, access_type = line.strip().split(',')
            # Check for location existence in input_arr (case-insensitive)
            if location.strip().upper() in [loc.upper() for loc in input_arr]:
                if access_type.strip().upper() == 'COMMON':
                    result_arr.append(location.strip())

    return result_arr


def get_avail_locations() -> list:
    csv_file = "LegalMS_data.csv"  # Replace with your actual CSV file path
    result_arr = []
    with open(csv_file, 'r') as f:
        # Skip the header row (assuming the first row contains column names)
        next(f)
        for line in f:
            location, access_type = line.strip().split(',')
            # Check for location existence in input_arr (case-insensitive)
            if access_type.strip().upper() == 'COMMON':
                result_arr.append(location.strip())

    return result_arr


'''
# Example usage
input_arr = ["Main St. & Elm St.", "Maple St. & Oak St.", "Spruce Ave. & Fir St.","High St. & Market St."]
result_arr = getLocationAccessType(input_arr)

if result_arr:
  print("Locations with 'COMMON' access type:", result_arr)
else:
  print("No locations with 'COMMON' access type found in the input array.")

print("-------------------- TEST 2 -------------------------")
result_arr = getAvailLocations()

if result_arr:
  print("Available locations", result_arr)
else:
  print("No locations with 'COMMON' access type found in the input array.")'''
