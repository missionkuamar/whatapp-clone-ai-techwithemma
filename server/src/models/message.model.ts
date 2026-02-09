import mongoose from "mongoose";
import { Schema } from "mongoose";

export interface MessageDocument extends Document {
 chatId: mongoose.Types.ObjectId;
    senderId: mongoose.Types.ObjectId;
    content?: string;
    image?: string;
    replyTo?: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const messageSchema = new Schema<MessageDocument>({
chatId: {
    type: Schema.Types.ObjectId,
    ref: "Chat",
    required: true,
},
content: {
    type: String,
    default: null,
},
image: {
    type: String,
    default: null,
},
senderId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
},
replyTo: {
    type: Schema.Types.ObjectId,
    ref: "Message",
    default: null,
},
} , {
    timestamps: true
}
    )

    const messageModel = mongoose.model<MessageDocument>("Message", messageSchema);

    export default messageModel
    