import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cigar, Pack } from './cigar.schema';

@Injectable()
export class CigarsService {
    constructor(
        @InjectModel(Cigar.name) private cigarModel: Model<Cigar>,
    ) { }


    async searchCigars(query: string, page: number, limit: number): Promise<{
        cigars: Cigar[],
        totalPages: number,
        totalRecords: number,
        skip: number
    }> {
        // if (!query) {
        //     return [];
        // }
        // const queryWords = query.split(" ").map(word => word.trim()).filter(word => word);
        // const searchString = queryWords.map(word => `\"${word}\"`).join(' ');
        // const cigars = await this.cigarModel.find({
        //     $text: { $search: searchString }
        // }, { score: { $meta: "textScore" } })
        //     .sort({ score: { $meta: "textScore" } })
        //     .exec();
        // return cigars;

        // ==================================================

        if (!query) {
            const skip = (page - 1) * limit >= 0 ? (page - 1) * limit : 0;
            const totalRecords = await this.cigarModel.countDocuments({}).exec();
            const cigars = await this.cigarModel.find({})
                .skip(skip)
                .limit(limit)
                .exec();

            const totalPages = Math.ceil(totalRecords / limit);
            return { cigars, totalPages, totalRecords, skip };
        }

        const queryWords = query.split(' ').map(word => word.trim()).filter(word => word);
        const searchString = queryWords.map(word => `\"${word}\"`).join(' ');
        const skip = (page - 1) * limit >= 0 ? (page - 1) * limit : 0;
        const totalRecords = await this.cigarModel.countDocuments({
            $text: { $search: searchString }
        }).exec();

        const cigars = await this.cigarModel.find({
            $text: { $search: searchString }
        }, { score: { $meta: 'textScore' } })
            .sort({ score: { $meta: 'textScore' } })
            .skip(skip)
            .limit(limit)
            .exec();

        const totalPages = Math.ceil(totalRecords / limit);
        return { cigars, totalPages, totalRecords, skip };

        // ===========================================

        // const regex = new RegExp(query, 'i');
        // return this.cigarModel.find({
        //     $or: [
        //         { name: regex },
        //         { shape: regex },
        //         { brand: regex },
        //     ],
        // }).exec();


        // {
        //     $and: [
        //     {$or: [
        // { name: RegExp('flor', 'i') },
        // { brand: RegExp('flor', 'i') },
        // { shape: RegExp('flor', 'i') },
        // ]},
        //     {$or: [
        // { name:  RegExp('de las', 'i') },
        // { brand:  RegExp('de las', 'i') },
        // { shape:  RegExp('de las', 'i') },
        // ]},
        //     {$or: [
        // { name:  RegExp('toro', 'i') },
        // { brand:  RegExp('toro', 'i') },
        // { shape:  RegExp('toro', 'i') },
        // ]}
        // ]
        // }


        // const regexps = queryWords.map(word => new RegExp(word, 'i'));
        // Construct $and array with regex conditions
        // const regexConditions = queryWords.map(word => ({
        //     $or: [
        //         { name: new RegExp(word, 'i') },
        //         { brand: new RegExp(word, 'i') },
        //         { shape: new RegExp(word, 'i') },
        //     ]
        // }));
        // const regexConditions = queryWords.map(word => ({ name: new RegExp(word, 'i') }));
        // const cigars = await this.cigarModel.find({
        //     $and: regexConditions,
        // }, { name: 1 }).exec();

        // Construct search string for AND behavior
    }


    async getFilters(): Promise<any> {
        const uniqueAttributes = await this.cigarModel.aggregate([
            {
                $group: {
                    _id: null,
                    brands: { $addToSet: '$brand' },
                    // lengths: { $addToSet: '$length' },
                    // rings: { $addToSet: '$ring' },
                    // strengths: { $addToSet: '$strength' },
                    origins: { $addToSet: '$origin' },
                    shapes: { $addToSet: '$shape' },
                }
            },
            {
                $project: {
                    _id: 0,
                    brands: 1,
                    // lengths: 1,
                    // rings: 1,
                    // strengths: 1,
                    origins: 1,
                    shapes: 1
                }
            }
        ]).exec();

        return uniqueAttributes[0];
    }

    async getSuggestions(query: string): Promise<Cigar[]> {
        if (!query) {
            return [];
        }

        const queryWords = query.split(" ").map(word => word.trim()).filter(word => word);
        const searchString = queryWords.map(word => `\"${word}\"`).join(' ');
        const cigars = await this.cigarModel.find({
            $text: { $search: searchString }
        }, { name: 1 }, { score: { $meta: "textScore" } })
            .sort({ score: { $meta: "textScore" } })
            .exec();
        return cigars.slice(0, 10);
    }
}
