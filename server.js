const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/photography_studio")
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log("MongoDB Error:", err));

    // User Schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: String
});

// Booking Schema
const bookingSchema = new mongoose.Schema({
    customerName: String,
    event: String,
    eventDate: String,
    venue: String,
    status: String
});

// Add Booking API
app.post("/api/bookings", async (req, res) => {
    try {
        const booking = new Booking(req.body);
        await booking.save();

        res.status(201).json({
            message: "Booking added successfully",
            booking: booking
        });

    } catch (error) {
        res.status(500).json({
            message: "Error adding booking",
            error: error.message
        });
    }
});

const Booking = mongoose.model("Booking", bookingSchema);

const User = mongoose.model("User", userSchema);

// Add User API
app.post("/api/users", async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();

        res.status(201).json({
            message: "User added successfully",
            user: user
        });

    } catch (error) {
        res.status(500).json({
            message: "Error adding user",
            error: error.message
        });
    }
});
// Login API
app.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email, password });

        if (!user) {
            return res.status(401).json({
                message: "Invalid Email or Password"
            });
        }

        res.json({
            message: "Login successful",
            user: {
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Login error",
            error: error.message
        });
    }
});

// Get All Bookings
app.get("/api/bookings", async (req, res) => {
    try {
        const bookings = await Booking.find();

        res.json(bookings);

    } catch (error) {
        res.status(500).json({
            message: "Error fetching bookings",
            error: error.message
        });
    }
});

// Update Booking
app.put("/api/bookings/:id", async (req, res) => {
    try {
        const booking = await Booking.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        res.json({
            message: "Booking updated successfully",
            booking: booking
        });

    } catch (error) {
        res.status(500).json({
            message: "Error updating booking",
            error: error.message
        });
    }
});

// Delete Booking
app.delete("/api/bookings/:id", async (req, res) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        res.json({
            message: "Booking deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Error deleting booking",
            error: error.message
        });
    }
});

// Assignment Schema
const assignmentSchema = new mongoose.Schema({
    bookingId: String,
    photographer: String,
    editor: String,
    assignmentDate: String,
    status: String
});

const Assignment = mongoose.model("Assignment", assignmentSchema);


// Add Assignment
app.post("/api/assignments", async (req, res) => {
    try {
        const assignment = new Assignment(req.body);
        await assignment.save();

        res.status(201).json({
            message: "Assignment added successfully",
            assignment: assignment
        });

    } catch (error) {
        res.status(500).json({
            message: "Error adding assignment",
            error: error.message
        });
    }
});


// Get All Assignments
app.get("/api/assignments", async (req, res) => {
    try {
        const assignments = await Assignment.find();

        res.json(assignments);

    } catch (error) {
        res.status(500).json({
            message: "Error fetching assignments",
            error: error.message
        });
    }
});
// Update Assignment
app.put("/api/assignments/:id", async (req, res) => {
    try {
        const assignment = await Assignment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!assignment) {
            return res.status(404).json({
                message: "Assignment not found"
            });
        }

        res.json({
            message: "Assignment updated successfully",
            assignment: assignment
        });

    } catch (error) {
        res.status(500).json({
            message: "Error updating assignment",
            error: error.message
        });
    }
});


// Delete Assignment
app.delete("/api/assignments/:id", async (req, res) => {
    try {
        const assignment = await Assignment.findByIdAndDelete(req.params.id);

        if (!assignment) {
            return res.status(404).json({
                message: "Assignment not found"
            });
        }

        res.json({
            message: "Assignment deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Error deleting assignment",
            error: error.message
        });
    }
});

// Enquiry Schema
const enquirySchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    event: String,
    message: String,
    status: String
});

const Enquiry = mongoose.model("Enquiry", enquirySchema);


// Add Enquiry
app.post("/api/enquiries", async (req, res) => {
    try {
        const enquiry = new Enquiry(req.body);
        await enquiry.save();

        res.status(201).json({
            message: "Enquiry added successfully",
            enquiry: enquiry
        });

    } catch (error) {
        res.status(500).json({
            message: "Error adding enquiry",
            error: error.message
        });
    }
});


// Get All Enquiries
app.get("/api/enquiries", async (req, res) => {
    try {
        const enquiries = await Enquiry.find();

        res.json(enquiries);

    } catch (error) {
        res.status(500).json({
            message: "Error fetching enquiries",
            error: error.message
        });
    }
});

// Update Enquiry
app.put("/api/enquiries/:id", async (req, res) => {
    try {
        const enquiry = await Enquiry.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!enquiry) {
            return res.status(404).json({
                message: "Enquiry not found"
            });
        }

        res.json({
            message: "Enquiry updated successfully",
            enquiry: enquiry
        });

    } catch (error) {
        res.status(500).json({
            message: "Error updating enquiry",
            error: error.message
        });
    }
});


// Delete Enquiry
app.delete("/api/enquiries/:id", async (req, res) => {
    try {
        const enquiry = await Enquiry.findByIdAndDelete(req.params.id);

        if (!enquiry) {
            return res.status(404).json({
                message: "Enquiry not found"
            });
        }

        res.json({
            message: "Enquiry deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Error deleting enquiry",
            error: error.message
        });
    }
});

// ================= CUSTOMER CRUD =================

// Customer Schema
const customerSchema = new mongoose.Schema({
    name: String,
    phone: String,
    event: String,
    eventDate: String,
    venue: String
});

const Customer = mongoose.model("Customer", customerSchema);


// POST - Add Customer
app.post("/api/customers", async (req, res) => {
    try {
        const customer = new Customer(req.body);
        await customer.save();

        res.status(201).json({
            message: "Customer added successfully",
            customer: customer
        });

    } catch (error) {
        res.status(500).json({
            message: "Error adding customer",
            error: error.message
        });
    }
});


// GET - Get All Customers
app.get("/api/customers", async (req, res) => {
    try {
        const customers = await Customer.find();

        res.json(customers);

    } catch (error) {
        res.status(500).json({
            message: "Error fetching customers",
            error: error.message
        });
    }
});


// PUT - Update Customer
app.put("/api/customers/:id", async (req, res) => {
    try {
        const customer = await Customer.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!customer) {
            return res.status(404).json({
                message: "Customer not found"
            });
        }

        res.json({
            message: "Customer updated successfully",
            customer: customer
        });

    } catch (error) {
        res.status(500).json({
            message: "Error updating customer",
            error: error.message
        });
    }
});


// DELETE - Delete Customer
app.delete("/api/customers/:id", async (req, res) => {
    try {
        const customer = await Customer.findByIdAndDelete(
            req.params.id
        );

        if (!customer) {
            return res.status(404).json({
                message: "Customer not found"
            });
        }

        res.json({
            message: "Customer deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Error deleting customer",
            error: error.message
        });
    }
});
// ================= TEAM MEMBERS =================

// 1. TEAM MEMBER SCHEMA

const teamMemberSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    role: String,
    specialization: String
}, {
    collection: "Tmember"
});

const TeamMember = mongoose.model(
    "TeamMember",
    teamMemberSchema
);


// 2. POST - ADD TEAM MEMBER

app.post("/api/team-members", async (req, res) => {
    try {
        const teamMember = new TeamMember(req.body);

        await teamMember.save();

        res.status(201).json({
            message: "Team member added successfully",
            teamMember: teamMember
        });

    } catch (error) {
        res.status(500).json({
            message: "Error adding team member",
            error: error.message
        });
    }
});


// 3. GET - DISPLAY ALL TEAM MEMBERS

app.get("/api/team-members", async (req, res) => {
    try {
        const teamMembers = await TeamMember.find();

        res.json(teamMembers);

    } catch (error) {
        res.status(500).json({
            message: "Error fetching team members",
            error: error.message
        });
    }
});

// 4. PUT - UPDATE TEAM MEMBER

app.put("/api/team-members/:id", async (req, res) => {
    try {
        const teamMember = await TeamMember.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!teamMember) {
            return res.status(404).json({
                message: "Team member not found"
            });
        }

        res.json({
            message: "Team member updated successfully",
            teamMember: teamMember
        });

    } catch (error) {
        res.status(500).json({
            message: "Error updating team member",
            error: error.message
        });
    }
});


// 5. DELETE - DELETE TEAM MEMBER

app.delete("/api/team-members/:id", async (req, res) => {
    try {
        const teamMember = await TeamMember.findByIdAndDelete(
            req.params.id
        );

        if (!teamMember) {
            return res.status(404).json({
                message: "Team member not found"
            });
        }

        res.json({
            message: "Team member deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Error deleting team member",
            error: error.message
        });
    }
});
// ================= PACKAGES =================

// 1. PACKAGE SCHEMA

const packageSchema = new mongoose.Schema({
    packageName: String,
    description: String,
    price: Number,
    duration: String,
    services: String
}, {
    collection: "packages"
});

const Package = mongoose.model("Package", packageSchema);


// 2. POST - ADD NEW PACKAGE

app.post("/api/packages", async (req, res) => {
    try {
        const newPackage = new Package(req.body);

        await newPackage.save();

        res.status(201).json({
            message: "Package added successfully",
            package: newPackage
        });

    } catch (error) {
        res.status(500).json({
            message: "Error adding package",
            error: error.message
        });
    }
});


// 3. GET - DISPLAY ALL PACKAGES

app.get("/api/packages", async (req, res) => {
    try {
        const packages = await Package.find();

        res.json(packages);

    } catch (error) {
        res.status(500).json({
            message: "Error fetching packages",
            error: error.message
        });
    }
});


// 4. PUT - UPDATE PACKAGE

app.put("/api/packages/:id", async (req, res) => {
    try {
        const updatedPackage = await Package.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedPackage) {
            return res.status(404).json({
                message: "Package not found"
            });
        }

        res.json({
            message: "Package updated successfully",
            package: updatedPackage
        });

    } catch (error) {
        res.status(500).json({
            message: "Error updating package",
            error: error.message
        });
    }
});


// 5. DELETE - DELETE PACKAGE

app.delete("/api/packages/:id", async (req, res) => {
    try {
        const deletedPackage = await Package.findByIdAndDelete(
            req.params.id
        );

        if (!deletedPackage) {
            return res.status(404).json({
                message: "Package not found"
            });
        }

        res.json({
            message: "Package deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Error deleting package",
            error: error.message
        });
    }
});

// ================= PAYMENTS =================

// 1. PAYMENT SCHEMA

const paymentSchema = new mongoose.Schema({
    customerName: String,
    bookingId: String,
    amount: Number,
    paymentDate: String,
    paymentMethod: String,
    paymentStatus: String,
    transactionId: String
}, {
    collection: "payments"
});

const Payment = mongoose.model("Payment", paymentSchema);


// 2. POST - ADD NEW PAYMENT

app.post("/api/payments", async (req, res) => {
    try {
        const payment = new Payment(req.body);

        await payment.save();

        res.status(201).json({
            message: "Payment added successfully",
            payment: payment
        });

    } catch (error) {
        res.status(500).json({
            message: "Error adding payment",
            error: error.message
        });
    }
});


// 3. GET - DISPLAY ALL PAYMENTS

app.get("/api/payments", async (req, res) => {
    try {
        const payments = await Payment.find();

        res.json(payments);

    } catch (error) {
        res.status(500).json({
            message: "Error fetching payments",
            error: error.message
        });
    }
});


// 4. PUT - UPDATE PAYMENT

app.put("/api/payments/:id", async (req, res) => {
    try {
        const payment = await Payment.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!payment) {
            return res.status(404).json({
                message: "Payment not found"
            });
        }

        res.json({
            message: "Payment updated successfully",
            payment: payment
        });

    } catch (error) {
        res.status(500).json({
            message: "Error updating payment",
            error: error.message
        });
    }
});


// 5. DELETE - DELETE PAYMENT

app.delete("/api/payments/:id", async (req, res) => {
    try {
        const payment = await Payment.findByIdAndDelete(
            req.params.id
        );

        if (!payment) {
            return res.status(404).json({
                message: "Payment not found"
            });
        }

        res.json({
            message: "Payment deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Error deleting payment",
            error: error.message
        });
    }
});

// ================= MEDIA DELIVERIES =================

// 1. MEDIA DELIVERY SCHEMA

const mediaDeliverySchema = new mongoose.Schema({
    customerName: String,
    bookingId: String,
    mediaType: String,
    deliveryDate: String,
    deliveryStatus: String,
    deliveryLink: String
}, {
    collection: "Mdeliveries"
});

const MediaDelivery = mongoose.model(
    "MediaDelivery",
    mediaDeliverySchema
);


// 2. POST - ADD MEDIA DELIVERY

app.post("/api/media-deliveries", async (req, res) => {
    try {
        const mediaDelivery = new MediaDelivery(req.body);

        await mediaDelivery.save();

        res.status(201).json({
            message: "Media delivery added successfully",
            mediaDelivery: mediaDelivery
        });

    } catch (error) {
        res.status(500).json({
            message: "Error adding media delivery",
            error: error.message
        });
    }
});


// 3. GET - DISPLAY ALL MEDIA DELIVERIES

app.get("/api/media-deliveries", async (req, res) => {
    try {
        const mediaDeliveries = await MediaDelivery.find();

        res.json(mediaDeliveries);

    } catch (error) {
        res.status(500).json({
            message: "Error fetching media deliveries",
            error: error.message
        });
    }
});


// 4. PUT - UPDATE MEDIA DELIVERY

app.put("/api/media-deliveries/:id", async (req, res) => {
    try {
        const mediaDelivery = await MediaDelivery.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!mediaDelivery) {
            return res.status(404).json({
                message: "Media delivery not found"
            });
        }

        res.json({
            message: "Media delivery updated successfully",
            mediaDelivery: mediaDelivery
        });

    } catch (error) {
        res.status(500).json({
            message: "Error updating media delivery",
            error: error.message
        });
    }
});


// 5. DELETE - DELETE MEDIA DELIVERY

app.delete("/api/media-deliveries/:id", async (req, res) => {
    try {
        const mediaDelivery = await MediaDelivery.findByIdAndDelete(
            req.params.id
        );

        if (!mediaDelivery) {
            return res.status(404).json({
                message: "Media delivery not found"
            });
        }

        res.json({
            message: "Media delivery deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Error deleting media delivery",
            error: error.message
        });
    }
});

// ================= QUOTATIONS =================

// 1. QUOTATION SCHEMA

const quotationSchema = new mongoose.Schema({
    customerName: String,
    bookingId: String,
    packageName: String,
    amount: Number,
    discount: Number,
    totalAmount: Number,
    quotationDate: String,
    status: String
}, {
    collection: "quotations"
});

const Quotation = mongoose.model("Quotation", quotationSchema);


// 2. POST - ADD NEW QUOTATION

app.post("/api/quotations", async (req, res) => {
    try {
        const quotation = new Quotation(req.body);

        await quotation.save();

        res.status(201).json({
            message: "Quotation added successfully",
            quotation: quotation
        });

    } catch (error) {
        res.status(500).json({
            message: "Error adding quotation",
            error: error.message
        });
    }
});


// 3. GET - DISPLAY ALL QUOTATIONS

app.get("/api/quotations", async (req, res) => {
    try {
        const quotations = await Quotation.find();

        res.json(quotations);

    } catch (error) {
        res.status(500).json({
            message: "Error fetching quotations",
            error: error.message
        });
    }
});


// 4. PUT - UPDATE QUOTATION

app.put("/api/quotations/:id", async (req, res) => {
    try {
        const quotation = await Quotation.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!quotation) {
            return res.status(404).json({
                message: "Quotation not found"
            });
        }

        res.json({
            message: "Quotation updated successfully",
            quotation: quotation
        });

    } catch (error) {
        res.status(500).json({
            message: "Error updating quotation",
            error: error.message
        });
    }
});


// 5. DELETE - DELETE QUOTATION

app.delete("/api/quotations/:id", async (req, res) => {
    try {
        const quotation = await Quotation.findByIdAndDelete(
            req.params.id
        );

        if (!quotation) {
            return res.status(404).json({
                message: "Quotation not found"
            });
        }

        res.json({
            message: "Quotation deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Error deleting quotation",
            error: error.message
        });
    }
});
app.get("/", (req, res) => {
    res.send("Photography Studio API is running!");
});

app.listen(4000, () => {
    console.log("Server running on port 4000");
});
