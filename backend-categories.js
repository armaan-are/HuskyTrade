class Profile {
        constructor(name, picture, description, category, price, owner, location) {
            this.name = name; 
            this.picture = picture; 
            this.description = description; 
            this.category = category;
            this.price = price; 
            this.owner = owner; 
            this.location = location; 
        }
    
    }
    
    let list = [];

    const container = document.getElementById("homeitems");
    
    var newProfile = new Profile(
        "English Textbook",
        "https://smithfamilybookstore.com/wp-content/uploads/2019/11/girls-reading-3.jpg",
        "I don't want this anymore",
        "Books",
        "FREE",
        "Buckley Hall",
        "Location"
    );
    
    // Define the item block HTML structure using Profile's properties
    var itemBlockHTML = `
    <div class="itemblock">
        <div class="itemblock_image">
            <img src="${newProfile.picture}" alt="Image">
        </div>
        <div class="itemblock__content">
            <div class="itemblock_title">${newProfile.name}</div>
            <div class="itemblock_description">${newProfile.description}</div>
            <div class="price_and_loc">
                <div class="itemblock_price">${newProfile.price}</div>
                <div class="itemblock_location">
                    <img src="locationicon.png" alt="Location" style="width: 20px; height: 20px;">
                    ${newProfile.location}
                </div>
            </div>
        </div>
    </div>
`;
    
    window.onload = function() {
        container.innerHTML += itemBlockHTML;  // Append the string as HTML inside the container
        container.innerHTML += itemBlockHTML;  // Append the string as HTML inside the container
        container.innerHTML += itemBlockHTML;  // Append the string as HTML inside the container

    };