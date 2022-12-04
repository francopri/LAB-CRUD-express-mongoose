import express from "express";
import AlbumModel from "../models/album.model.js";
import PurchaseModel from "../models/purchase.model.js";


const purchaseRoute = express.Router();


purchaseRoute.post("/create-purchase/:albumId", async (req, res) => {
    
    try {
        const { albumId } = req.params;

        const newPurchase = await PurchaseModel.create({ ...req.body, album: albumId });

        await AlbumModel.findByIdAndUpdate(
            albumId,
            {
                $push: {
                    purchase: newPurchase._id,
                },
            },
            { new: true, runValidators: true }
        );

        return res.status(201).json(newPurchase);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Purchase não foi criada.", error: error.errors });
    }
});

purchaseRoute.get("/:purchaseId", async (req, res) => {
    try {
        const { purchaseId } = req.params;

        const purchase = await PurchaseModel.findById(purchaseId).populate("album");

        if (!purchase) {
            return res.status(400).json({ msg: " Purchase não encontrada!" });
        }

        return res.status(200).json(purchase);

    } catch (error) {
        console.log(error);
        return res.status(500).json(error.errors);
    }
});

export default purchaseRoute;
