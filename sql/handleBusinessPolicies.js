// funtion to return location where id is a given id, string
const getBusinessPolicy = async (db, id) => {
    try {
        // prepared statement
        const statement = await db.prepareAsync(
            `SELECT * FROM business_policies WHERE id = $id`
        );
        
        try {
            // execute
            const result = await statement.executeAsync({$id: id});
            // get location from result
            const businessPolicy = await result.getFirstAsync();

            // return businessPolicy
            return businessPolicy;
        } catch (error) {
            console.log("GET POLICY EROR", error.message);    
            throw error;
        } finally {
            await statement.finalizeAsync();
        }
    } catch (error) {
        console.log("PREPARE GET POLICY EROR", error.message);    
        throw error;        
    }
}

// function to update location, require location object and data object
const updateBusinessPolicy = async (db, businessPolicy, data) => {
    try {
        // statement
        const statement = await db.prepareAsync(
            `UPDATE business_policies SET 
                additional_policy = $additional_policy, 
                failed_delivery_percentage = $failed_delivery_percentage, 
                max_inactive_inventory = $max_inactive_inventory, 
                max_remittance_duration = $max_remittance_duration
            WHERE id = $id`
        );

        // check if full_name was not changed
        const additionalPolicyChanged = businessPolicy?.additional_policy !== data?.additional_policy;
    
        // check if phone was not changed
        const failedDeliveryPercentageChanged = businessPolicy?.failed_delivery_percentage !== data?.failed_delivery_percentage

        // check if role was not changed
        const maxInactiveInventoryChanged = businessPolicy?.max_inactive_inventory !== data?.max_inactive_inventory
        
        // check if role was not changed
        const maxRemittanceDurationChanged = businessPolicy?.max_remittance_duration !== data?.max_remittance_duration
        
        // check if no changes in data and return early
        if (!additionalPolicyChanged && !failedDeliveryPercentageChanged && !maxInactiveInventoryChanged && !maxRemittanceDurationChanged) {
            return businessPolicy.id;
        }

        try {
            // execute
            await statement.executeAsync({
                $additional_policy: data?.additional_policy || businessPolicy?.additional_policy,
                $failed_delivery_percentage: data?.failed_delivery_percentage || businessPolicy?.failed_delivery_percentage,
                $max_inactive_inventory: data?.max_inactive_inventory || businessPolicy?.max_inactive_inventory,
                $max_remittance_duration: data?.max_remittance_duration || businessPolicy?.max_remittance_duration,
                $id: businessPolicy?.id,
            });

            return businessPolicy?.id;
    
        } catch (error) {
            console.log("UPDATE POLICY ERROR:", error.message)
            throw error;
        } finally {
            await statement.finalizeAsync();
        }
    } catch (error) {
        console.log("PREPARE UPDATE POLICY ERROR:", error.message);
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
const createBusinessPolicy = async (db, businessPolicy) => {
    try {
        // prepare statement
        const statement = await db.prepareAsync(
            `INSERT INTO business_policies (
                id, 
                additional_policy, 
                failed_delivery_percentage, 
                max_inactive_inventory, 
                max_remittance_duration
            ) VALUES (
                $id,
                $additional_policy,
                $failed_delivery_percentage, 
                $max_inactive_inventory, 
                $max_remittance_duration
            )`
        );

        try {
            // check if locations exist
            const result = await getBusinessPolicy(db, businessPolicy?.id);
            
            // if result exist return, else insert into locations table
            if (result) {
                console.log('businessPolicy result', result);
                await updateBusinessPolicy(db, result, businessPolicy);
                return 'businessPolicy already exist';
            };
            
            console.log('creating business policy data');

            // execute async
            const execute = await statement.executeAsync({
                $id: businessPolicy?.id,
                $additional_policy: businessPolicy?.additional_policy,
                $failed_delivery_percentage: businessPolicy?.failed_delivery_percentage,
                $max_inactive_inventory: businessPolicy?.max_inactive_inventory,
                $max_remittance_duration: businessPolicy?.max_remittance_duration,
            });

            // return id of inserted row
            return execute?.lastInsertRowId;
            
        } catch (error) {
            console.log("CREATE POLICY ERROR:", error.message);
            throw error;
        } finally {
            // finallize prepared statement
            await statement.finalizeAsync();
        }
    } catch (error) {
        console.log("PREPARE CREATE POLICY ERROR:", error.message);
        throw error;        
    }
}

// delete location
const deleteBusinessPolicy = async (db, id) => {
    try {
        // prepared statement
        const statement = await db.prepareAsync(
            `DELETE FROM business_policies WHERE id = $id`
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

// delete location
const pruneBusinessPolicy = async (db, data) => {
    try {
        // loctions array
        const locations = await getBusinessPolicy(db);

        // locations
        locations.forEach(async (location) => {
            // check if location, exist in recent data
            if (!data.find(item => item.id === location.id)) {
                // delete location, that  dont exis in online db
                await deleteBusinessPolicy(db, location.id);
            }
        });

    } catch (error) {
        console.log("PRUNE POLICY ERROR", error.message)
        throw error;        
    }
}

// create locations table location
const createTableBusinessPolicy = async (db) => {
    try {
        // prepared statement
        const statement = await db.prepareAsync(
            `CREATE TABLE IF NOT EXISTS business_policies (
                id STRING PRIMARY KEY NOT NULL,
                additional_policy TEXT NOT NULL,
                failed_delivery_percentage TEXT NOT NULL, 
                max_inactive_inventory TEXT NOT NULL, 
                max_remittance_duration TEXT NOT NULL
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


export const handleBusinessPolicies = {
    getBusinessPolicy, // functionto get business policy
    createBusinessPolicy, // function to create business policy
    createTableBusinessPolicy, // cretae business policy
    pruneBusinessPolicy, // prune business policy
}