import { Request, Response } from "express";
import ProductModel from "../../models/product.model";
import handleSendResponse from "../../helpers/handleSendResponse";
import { STATUS_TEXT } from "../../enums/statusTexts";

const getAllProducts = async (_: Request, res: Response) => {
  const products = await ProductModel.find();

  handleSendResponse(res, products, null, 200, STATUS_TEXT.SUCCESSFUL);
};

export default getAllProducts;
