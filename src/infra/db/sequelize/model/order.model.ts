import { Model } from "sequelize";
import { Column, PrimaryKey } from "sequelize-typescript";

export default class OrderModel extends Model {

    @PrimaryKey
    @Column
    declare id: string;

}