import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Pack extends Document {
    @Prop()
    name: string;

    @Prop()
    availability: string;

    @Prop()
    price: string;
}

export const PackSchema = SchemaFactory.createForClass(Pack);

@Schema()
export class Cigar extends Document {
    @Prop({ unique: true })
    unique_id: string;

    @Prop()
    brand: string;

    @Prop()
    length: string;

    @Prop()
    name: string;

    @Prop()
    origin: string;

    @Prop({ type: [PackSchema] })
    packs: Pack[];

    @Prop()
    prod_url: string;

    @Prop()
    ring: string;

    @Prop()
    scraped_at: Date;

    @Prop()
    shape: string;

    @Prop()
    site_name: string;

    @Prop()
    strength: string;
}

export const CigarSchema = SchemaFactory.createForClass(Cigar);