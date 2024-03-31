- test these files
- are the locations being sent in an array or a string?
  - if it's a string then does it expect a string in return or an array

- check if array is empty
  - if !empty
    - expect an array of available locations
  - else
    - expect a null array : The user should receive a string: "No available locations"


Tests:

    1. dataRequest.py (Done!)
        - get_location_access_type(input_arr)
            - success
                - returns an array of available locations from a given array of locations or an
                    empty array if there aren't any available locations
        - get_avail_locations()
            - success
                - returns an array of locations with ALL available locations from the dataset or
                    an empty array if there aren't any available locations

    2.  LegalMS_grpc.py (Incomplete)
        - create a client that sends the stub requests and test the ouputs accordingly
        - Does the ..._pb2.py file need to be furhter modified?

    3. LegalMS_api.py (Incomplete)
        - use the OpenAI interface to test these methods
        