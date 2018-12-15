for filename in *; do mongoimport --db propertyBookingDetails --collection properties --file $filename --jsonArray; done

