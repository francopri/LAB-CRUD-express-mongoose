import express from "express";
import AlbumModel from "../models/album.model.js";
import PurchaseModel from "../models/purchase.model.js";

const albumsRoute = express.Router();

albumsRoute.post("/", async (req, res) => {

    try {

        const createNewAlbum = await AlbumModel.create(req.body);

        return res.status(201).json(createNewAlbum);

    } catch (error) {
        console.log(error);
        return res.status(400).json(error.errors);
    }
});

albumsRoute.get("/allAlbums", async (req, res) => {
    try {

        const albums = await AlbumModel.find();

        return res.status(200).json(albums);

    } catch (error) {
        console.log(error);
        return res.status(400).json(error.errors);

    }
});

albumsRoute.get("/:albumId", async (req, res) => {

    try {

        const { albumId } = req.params;

        const album = await AlbumModel.findById(albumId);
        return res.status(200).json(album);

    } catch (error) {
        console.log(error);
        return res.status(400).json(error.errors);
    }
});

albumsRoute.put("/edit/:albumId", async (req, res) => {
    try {
        const { albumId } = req.params;
        
        console.log({albumId, body: req.body})

        const updatedAlbum = await AlbumModel.findOneAndUpdate(
            { _id: albumId },
            { ...req.body },
            { new: true, runValidators: true }
        );

        return res.status(200).json(updatedAlbum);

    } catch (error) {
        console.log(error);
        return res.status(400).json(error.errors);
    }
});

albumsRoute.delete("/delete/:albumId", async (req, res) => {

    try {
        const { albumId } = req.params;

        const deletedAlbum = await AlbumModel.findByIdAndDelete(albumId);

        if (!deletedAlbum) {
            return res.status(400).json({ msg: "Álbum não encontrado!" });
        }

        return res.status(200).json({ msg: "Álbum deletado." });

    } catch (error) {
        console.log(error);
        return res.status(204).json(error.errors);
    }
});

export default albumsRoute;