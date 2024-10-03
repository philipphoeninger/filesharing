IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20241001201945_Initial'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20241001201945_Initial', N'8.0.8');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20241003203009_CreateFileItemEntity'
)
BEGIN
    CREATE TABLE [dbo].[FileItems] (
        [Id] int NOT NULL IDENTITY,
        [Name] nvarchar(200) NOT NULL,
        [CreatedAt] datetime2 NOT NULL DEFAULT (GetDate()),
        [IsDeleted] bit NOT NULL,
        [ParentId] int NULL,
        [IsFolder] bit NOT NULL DEFAULT CAST(0 AS bit),
        [Display] AS [Name] PERSISTED,
        [ValidFrom] datetime2 GENERATED ALWAYS AS ROW START HIDDEN NOT NULL,
        [ValidTo] datetime2 GENERATED ALWAYS AS ROW END HIDDEN NOT NULL,
        [TimeStamp] rowversion NOT NULL,
        CONSTRAINT [PK_FileItems] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_FileItems_Parents] FOREIGN KEY ([ParentId]) REFERENCES [dbo].[FileItems] ([Id]),
        PERIOD FOR SYSTEM_TIME([ValidFrom], [ValidTo])
    ) WITH (SYSTEM_VERSIONING = ON (HISTORY_TABLE = [dbo].[FileItemsAudit]));
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20241003203009_CreateFileItemEntity'
)
BEGIN
    CREATE INDEX [IX_FileItems_ParentId] ON [dbo].[FileItems] ([ParentId]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20241003203009_CreateFileItemEntity'
)
BEGIN
    EXEC(N'CREATE UNIQUE INDEX [IX_Items_Path] ON [dbo].[FileItems] ([Name], [ParentId]) WHERE [ParentId] IS NOT NULL');
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20241003203009_CreateFileItemEntity'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20241003203009_CreateFileItemEntity', N'8.0.8');
END;
GO

COMMIT;
GO

