import { loadQueryFile } from "../utils";

export const migrations = [
    loadQueryFile(__dirname, "./20180304100000-create-migrations-table.sql"),
    loadQueryFile(__dirname, "./20180305100000-create-wallets-table.sql"),
    loadQueryFile(__dirname, "./20180305200000-create-rounds-table.sql"),
    loadQueryFile(__dirname, "./20180305300000-create-blocks-table.sql"),
    loadQueryFile(__dirname, "./20180305400000-create-transactions-table.sql"),
    loadQueryFile(__dirname, "./20181129400000-add-block_id-index-to-transactions-table.sql"),
    loadQueryFile(__dirname, "./20181204100000-add-generator_public_key-index-to-blocks-table.sql"),
    loadQueryFile(__dirname, "./20181204200000-add-timestamp-index-to-blocks-table.sql"),
    loadQueryFile(__dirname, "./20181204300000-add-sender_public_key-index-to-transactions-table.sql"),
    loadQueryFile(__dirname, "./20181204400000-add-recipient_id-index-to-transactions-table.sql"),
    loadQueryFile(__dirname, "./20190307000000-drop-wallets-table.sql"),
    loadQueryFile(__dirname, "./20190313000000-add-asset-column-to-transactions-table.sql"),
    loadQueryFile(__dirname, "./20190411000000-create-attributes-table.sql"),
    loadQueryFile(__dirname, "./20190412000000-attributetypes.sql"),
    loadQueryFile(__dirname, "./20190521000000-create-services.sql"),
    loadQueryFile(__dirname, "./20190522000000-create-identity-uses.sql"),
];
