import { FileInformation } from './Ifile-information';

export interface File extends FileInformation {

    content: Uint8Array | string;
    type: string;
}