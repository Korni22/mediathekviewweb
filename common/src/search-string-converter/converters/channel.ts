import { SegmentConverter } from '../';
import { QueryBody } from '../../search-engine/index';
import { Field } from '../../model/index';
import { SelectorSegmentConverterBase } from './selector-segment-converter-base';
import { TextQueryBuilder } from '../../search-engine/query/builder';

const SELECTOR_REGEX = /^ch(a(n(n(e(l)?)?)?)?)?$/;

export class ChannelSegmentConverter extends SelectorSegmentConverterBase implements SegmentConverter {
    constructor() {
        super(SELECTOR_REGEX);
    }

    protected textToQuery(text: string): QueryBody {
        const builder = new TextQueryBuilder();
        const query = builder.fields(Field.Channel).text(text).operator('and').build();

        return query;
    }
}