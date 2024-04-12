// funtion to return location where id is a given id, string
const getLocation = async (db, id) => {
    try {
        // prepared statement
        const statement = await db.prepareAsync(
            `SELECT * FROM locations WHERE id = $id`
        );
        
        try {
            // execute
            const result = await statement.executeAsync({$id: id});
            // get location from result
            const location = await result.getFirstAsync();

            // return location
            return location;
        } catch (error) {
            console.log("GET LOCATION EROR", error.message);    
            throw error;
        } finally {
            await statement.finalizeAsync();
        }
    } catch (error) {
        console.log("PREPARE GET LOCATION EROR", error.message);    
        throw error;        
    }
}

// function to update location, require location object and data object
const updateLocation = async (db, location, data) => {
    try {
        // statement
        const statement = await db.prepareAsync(
            `UPDATE locations SET 
                delivery_charge = $delivery_charge, 
                region = $region, 
                warehouse_id = $warehouse_id, 
                warehouse_name = $warehouse_name
            WHERE id = $id`
        );

        // check if full_name was not changed
        const deliveryChargeChanged = location?.delivery_charge !== data?.delivery_charge;
    
        // check if phone was not changed
        const regionChanged = location?.region !== data?.region

        // check if role was not changed
        const warehouseIdChanged = location?.warehouse_id !== data?.warehouse_id
        
        // check if no changes in data and return early
        if (!deliveryChargeChanged && !regionChanged && !warehouseIdChanged) {
            return location.id;
        }

        try {
            // execute
            await statement.executeAsync({
                $delivery_charge: data?.delivery_charge || location?.delivery_charge,
                $region: data?.region || location?.region,
                $warehouse_id: data?.warehouse_id || location?.warehouse_id,
                $warehouse_name: data?.warehouse_id || location?.warehouse_id,
                $id: location?.id,
            });

            return location?.id;
    
        } catch (error) {
            console.log("updateLocation Error:", error.message)
            throw error;
        } finally {
            await statement.finalizeAsync();
        }
    } catch (error) {
        console.log("PREPARE UPDATE LOCATION ERROR:", error.message);
        throw error;        
    }
    
}

/* 
    locations is an object with each entry of the following type
    id string , 
    delivery_charge float,
    region text,
    state text,
    warehouse_id text,
    warehouse_name text,
*/
const createLocation = async (db, location) => {
    try {
        // prepare statement
        const statement = await db.prepareAsync(
            `INSERT INTO locations (
                id,
                delivery_charge,
                region,
                state,
                warehouse_id,
                warehouse_name
            ) VALUES (
                $id,
                $delivery_charge,
                $region,
                $state,
                $warehouse_id,
                $warehouse_name
            )`
        );

        try {
            // check if locations exist
            const result = await getLocation(db, location?.id);
            
            // if result exist return, else insert into locations table
            if (result) {
                await updateLocation(db, result, location);
                return 'location already exist';
            };
            
            // execute async
            const execute = await statement.executeAsync({
                $id: location?.id,
                $delivery_charge: location?.delivery_charge,
                $region: location?.region,
                $state: location?.state,
                $warehouse_id: location?.warehouse_id,
                $warehouse_name: location?.warehouse_name,
            });

            // return id of inserted row
            return execute?.lastInsertRowId;
            
        } catch (error) {
            console.log("CREATE LOCATION ERROR:", error.message);
            throw error;
        } finally {
            // finallize prepared statement
            await statement.finalizeAsync();
        }
    } catch (error) {
        console.log("PREPARE CREATE LOCATION ERROR:", error.message);
        throw error;        
    }
}

// get all locations
const getLocations = async (db) => {
    try {
        // prepared statement
        const statement = await db.prepareAsync(
            `SELECT *
            FROM locations
            ORDER BY state ASC, region ASC`
        );
        try {
            // execute
            const execute = await statement.executeAsync();
    
            // all locations
            const locations = await execute.getAllAsync();
    
            // return all locations
            return locations;
        } catch (error) {
            console.log('GET LOCATIONS ERROR', error.message);
            throw error;
        } finally {
            await statement.finalizeAsync();
        }
    } catch (error) {
        console.log('PREPARE GET LOCATIONS ERROR', error.message);
        throw error;        
    }
}

// delete location
const deleteLocations = async (db, id) => {
    try {
        // prepared statement
        const statement = await db.prepareAsync(
            `DELETE FROM locations WHERE id = $id`
        );
        try {
            // execute
            await statement.executeAsync({$id: id});
        } catch (error) {
            console.log("DELETE ERROR", error.message)
            throw error;
        } finally {
            await statement.finalizeAsync();
        }
        
    } catch (error) {
        console.log("PREPARE DELETE ERROR", error.message)
        throw error;        
    }
}

// create locations table location
const createTableLocations = async (db) => {
    try {
        // prepared statement
        const statement = await db.prepareAsync(
            `CREATE TABLE IF NOT EXISTS locations (
                id STRING PRIMARY KEY NOT NULL,
                delivery_charge FLOAT NOT NULL,
                region TEXT NOT NULL,
                state TEXT NOT NULL,
                warehouse_id TEXT NOT NULL,
                warehouse_name TEXT NOT NULL
            )`
        );

        try {
            // execute
            await statement.executeAsync();
        } catch (error) {
            console.log("CREATE TABLE ERROR", error.message)
            throw error;
        } finally {
            await statement.finalizeAsync();
        }
        
    } catch (error) {
        console.log("PREPARE CREATE TABLE ERROR", error.message)
        throw error;        
    }
}


export const handleLocations = {
    getLocation, // functionto get location
    getLocations, // get all locations
    createLocation, // function to create location
    updateLocation, // update location
    deleteLocations, //.delete location
    createTableLocations, // create locations table
}