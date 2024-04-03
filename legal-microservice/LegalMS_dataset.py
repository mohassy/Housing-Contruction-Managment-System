def get_location_access_type(input_string) -> str:
    locations = input_string.split(',')
    result_arr = []
    with open("LegalMS_data.csv", 'r') as f:
        # Skip the header row
        next(f)
        for line in f:
            location, access_type = line.strip().split(',')
            # Check for location existence in input_arr (case-insensitive)
            if location.strip().upper() in [loc.upper() for loc in locations]:
                if access_type.strip().upper() == 'COMMON':
                    result_arr.append(location.strip())

    if result_arr:
        return ','.join(result_arr)  # Return a string if there are results
    else:
        return ""  # Return an empty string if no results found


def get_avail_locations() -> str:
    result_arr = []
    with open("LegalMS_data.csv", 'r') as f:
        # Skip the header row
        next(f)
        for line in f:
            location, access_type = line.strip().split(',')
            # Check for location existence in input_arr (case-insensitive)
            if access_type.strip().upper() == 'COMMON':
                result_arr.append(location.strip())

    if result_arr:
        return ','.join(result_arr)  # Return a string if there are results
    else:
        return ""  # Return an empty string if no results found


'''
# Example usage
input_arr = 'Etobicoke West Mall,Banbury-Don Mills,Clairlea-Birchmount,Mimico'
result_arr = get_location_access_type(input_arr)
print(result_arr)'''


