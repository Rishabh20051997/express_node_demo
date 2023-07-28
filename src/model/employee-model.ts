import mongoose from "mongoose"

const Schema = mongoose.Schema;
const employeeSchema = new Schema<IEmployeeSchema>({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    }
});

const employeeModelSchema = mongoose.model('Employee', employeeSchema);

// type employeeModelType = InferSchemaType<typeof employeeSchema>;

export default employeeModelSchema
