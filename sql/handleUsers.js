import { time } from "../utils/time";

// funtion to return user where id is a given id, string
const getUser = async (db, id) => {
    try {
        // prepared statement
        const statement = await db.prepareAsync(
            `SELECT * FROM users WHERE id = $id`
        );
        try {
            
            let result = await statement.executeAsync({$id: id});
    
            // get user from result
            const user = await result.getFirstAsync();

            // return user
            return user;
        } catch (error) {
            console.log("GET USER EROR", error.message);    
            throw error;
        } finally {
            await statement.finalizeAsync();
        }
    } catch (error) {
        console.log("PREPARE GET USER EROR", error.message);    
        throw error;        
    }
}

// function to update user, require user object and data object
const updateUser = async (db, user, data) => {
    try {
        // statement
        const statement = await db.prepareAsync(
            `UPDATE users SET 
                full_name = $full_name, 
                phone = $phone, 
                role = $role, 
                deactivated = $deactivated,
                profile_image = $profile_image,
                created_at = $created_at
            WHERE id = $id;`
        );

        // check if full_name was not changed
        const fullNameChanged = user?.full_name !== data?.full_name;
    
        // check if phone was not changed
        const phoneChanged = user?.phone !== data?.phone

        // check if role was not changed
        const roleChanged = user?.role !== data?.role
        
        // check if deactivated was not changed
        const deactivatedChanged = user?.deactivated !== data?.deactivated
        
        // check if role was not changed
        const profileImageChanged = user?.profileImage !== data?.profileImage

        // check if no changes in data and return early
        if (!fullNameChanged && !phoneChanged && !roleChanged && !deactivatedChanged && !profileImageChanged) {
            return user.id;
        }

        try {
            
            // execute
            const execute = await statement.executeAsync({
                $full_name: data?.full_name || user?.full_name,
                $phone: data?.phone || user?.phone,
                $role: data?.role || user?.role,
                $deactivated: data?.deactivated === undefined ? user?.deactivated : data?.deactivated,
                $profile_image: data?.profile_image || user?.profile_image,
                $created_at: time.serverTimestampToISOString(data.created_at),
                $id: user?.id,
            });
            return user.id;
    
        } catch (error) {
            console.log("updateUser Error:", error.message)
            throw error;
        } finally {
            await statement.finalizeAsync();
        }
    } catch (error) {
        console.log("PREPARE UPDATE USER ERROR:", error.message);
        throw error;        
    }
    
}

/* 
    users is an object with each entry of the following type
    id string , 
    admin string,
    created_at datetime,
    created_by datetime,
    email text,
    deactivated boolean,
    full_name string,
    phone string
    profile_image string,
    role string,
*/
const createUser = async (db, user, activeUser) => {
    try {
        // let statement;

        // prepare statement
        const statement = await db.prepareAsync(
            `INSERT INTO users (
                id,
                active_user,
                admin,
                email,
                created_at,
                deactivated,
                full_name,
                phone,
                profile_image,
                role
            ) VALUES (
                $id,
                $active_user,
                $admin,
                $email,
                $created_at,
                $deactivated,
                $full_name,
                $phone,
                $profile_image,
                $role
            )`
        );

        try {
            // check if users exist
            const result = await getUser(db, user.id);

            // if result exist return, else insert into users table
            if (result) {
                const modifyResult = {...result, deactivated: result.deactivated === 1};
                await updateUser(db, modifyResult, user);
                return 'user already exist';
            };

            // execute async
            const execute = await statement.executeAsync({
                $id: user?.id,
                $active_user: activeUser,
                $admin: user?.admin,
                $email: user?.email,
                $created_at: JSON.stringify(user?.created_at), // save timestamp as a string
                $deactivated: user?.deactivated,
                $full_name: user?.full_name,
                $phone: user?.phone,
                $profile_image: user?.profile_image,
                $role: user?.role
            });

            // return id of inserted row
            return execute?.lastInsertRowId;
            
        } catch (error) {
            console.log("CREATE USER ERROR:", error.message);
            throw error;
        } finally {
            // finallize prepared statement
            await statement.finalizeAsync();
        }
    } catch (error) {
        console.log("PREPARE CREATE USER ERROR:", error.message);
        throw error;        
    }
}

// get all users
const getUsers = async (db) => {
    try {
        // prepared statement
        const statement = await db.prepareAsync(
            `SELECT *
            FROM users
            ORDER BY admin DESC, full_name ASC`
        );
        try {
            
    
            // execute
            const execute = await statement.executeAsync();
    
            // all users
            const users = await execute.getAllAsync();
    
            // return all users
            return users;
        } catch (error) {
            console.log('GET USERS ERROR', error.message);
            throw error;
        } finally {
            await statement.finalizeAsync();
        }
    } catch (error) {
        console.log('PREPARE GET USERS ERROR', error.message);
        throw error;        
    }
}

// get all users
const getUsersRange = async (db, startDate, endDate) => {
    try {
        // prepared statement
        const statement = await db.prepareAsync(
            `SELECT *
            FROM users
            WHERE created_at >= ? AND created_at <= ?
            ORDER BY admin DESC, full_name ASC`
        );
        try {
            // execute
            const execute = await statement.executeAsync([startDate, endDate]);
    
            // all users
            const users = await execute.getAllAsync();
    
            // return all users
            return users;
        } catch (error) {
            console.log('GET USERS ERROR', error.message);
            throw error;
        } finally {
            await statement.finalizeAsync();
        }
    } catch (error) {
        console.log('PREPARE GET USERS ERROR', error.message);
        throw error;        
    }
}

// delete user
const deleteUser = async (db, id) => {
    try {
        // prepared statement
        const statement = await db.prepareAsync(
            `DELETE FROM users WHERE id = $id`
        );
        try {
            // execute
            const execute = await statement.executeAsync({$id: id});
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


export const handleUsers = {
    getUser, // functionto get user
    getUsers, // get all users
    getUsersRange, // get all users
    createUser, // function to create user
    updateUser, // update user
    deleteUser, //.delete user
}