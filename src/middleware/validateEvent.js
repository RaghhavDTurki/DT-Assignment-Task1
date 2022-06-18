function validateEvent(body) {
    try {
        if (!body) {
            return {
                error: true,
                message: "Body cannot be empty"
            };
            
        }
        if (!body.name) {
            return {
                error: true,
                message: "Name cannot be empty"
            };
            
        }
        if (!body.tagline) {
            return {
                error: true,
                message: "Tagline cannot be empty"
            };
        }
        if (!body.description) {
            return {
                error: true,
                message: "Description cannot be empty"
            };
        }
        if (!body.schedule) {
            return {
                error: true,
                message: "Schedule cannot be empty"
            };
            
        }
        if (!body.moderator) {
            return {
                error: true,
                message: "Moderator cannot be empty"
            };
            
        }
        if (!body.category) {
            return {
                error: true,
                message: "Category cannot be empty"
            };
            
        }
        if (!body.sub_category) {
            return {
                error: true,
                message: "Sub Category cannot be empty"
            };
            
        }
        if (!body.rigor_rank) {
            return {
                error: true,
                message: "rigor_rank cannot be empty"
            };
        }
        return {
            error: false
        };
    }
    catch (err) {
        console.log(err);
        return {
            error: true,
            message: err
        }
    }
}

module.exports = validateEvent