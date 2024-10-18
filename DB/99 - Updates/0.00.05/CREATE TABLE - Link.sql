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

BEGIN TRANSACTION;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20241003205902_CreateSeriLogEntity'
)
BEGIN
    IF SCHEMA_ID(N'Logging') IS NULL EXEC(N'CREATE SCHEMA [Logging];');
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20241003205902_CreateSeriLogEntity'
)
BEGIN
    CREATE TABLE [Logging].[SeriLogs] (
        [Id] int NOT NULL IDENTITY,
        [Message] nvarchar(200) NOT NULL,
        [MessageTemplate] nvarchar(200) NOT NULL,
        [Level] nvarchar(200) NOT NULL,
        [TimeStamp] datetime2 NOT NULL DEFAULT (GetDate()),
        [Exception] nvarchar(200) NOT NULL,
        [Properties] Xml NOT NULL,
        [LogEvent] nvarchar(200) NOT NULL,
        [SourceContext] nvarchar(200) NOT NULL,
        [RequestPath] nvarchar(200) NOT NULL,
        [ActionName] nvarchar(200) NOT NULL,
        [ApplicationName] nvarchar(200) NOT NULL,
        [MachineName] nvarchar(200) NOT NULL,
        [FilePath] nvarchar(200) NOT NULL,
        [MemberName] nvarchar(200) NOT NULL,
        [LineNumber] int NOT NULL,
        CONSTRAINT [PK_SeriLogs] PRIMARY KEY ([Id])
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20241003205902_CreateSeriLogEntity'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20241003205902_CreateSeriLogEntity', N'8.0.8');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20241006001424_CreateIdentitySchema'
)
BEGIN
    IF SCHEMA_ID(N'identity') IS NULL EXEC(N'CREATE SCHEMA [identity];');
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20241006001424_CreateIdentitySchema'
)
BEGIN
    CREATE TABLE [identity].[Roles] (
        [Id] nvarchar(200) NOT NULL,
        [Name] nvarchar(256) NULL,
        [NormalizedName] nvarchar(256) NULL,
        [ConcurrencyStamp] nvarchar(200) NULL,
        CONSTRAINT [PK_Roles] PRIMARY KEY ([Id])
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20241006001424_CreateIdentitySchema'
)
BEGIN
    CREATE TABLE [identity].[Users] (
        [Id] nvarchar(200) NOT NULL,
        [UserName] nvarchar(256) NULL,
        [NormalizedUserName] nvarchar(256) NULL,
        [Email] nvarchar(256) NULL,
        [NormalizedEmail] nvarchar(256) NULL,
        [EmailConfirmed] bit NOT NULL,
        [PasswordHash] nvarchar(200) NULL,
        [SecurityStamp] nvarchar(200) NULL,
        [ConcurrencyStamp] nvarchar(200) NULL,
        [PhoneNumber] nvarchar(200) NULL,
        [PhoneNumberConfirmed] bit NOT NULL,
        [TwoFactorEnabled] bit NOT NULL,
        [LockoutEnd] datetimeoffset NULL,
        [LockoutEnabled] bit NOT NULL,
        [AccessFailedCount] int NOT NULL,
        CONSTRAINT [PK_Users] PRIMARY KEY ([Id])
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20241006001424_CreateIdentitySchema'
)
BEGIN
    CREATE TABLE [identity].[RoleClaims] (
        [Id] int NOT NULL IDENTITY,
        [RoleId] nvarchar(200) NOT NULL,
        [ClaimType] nvarchar(200) NULL,
        [ClaimValue] nvarchar(200) NULL,
        CONSTRAINT [PK_RoleClaims] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_RoleClaims_Roles_RoleId] FOREIGN KEY ([RoleId]) REFERENCES [identity].[Roles] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20241006001424_CreateIdentitySchema'
)
BEGIN
    CREATE TABLE [identity].[UserClaims] (
        [Id] int NOT NULL IDENTITY,
        [UserId] nvarchar(200) NOT NULL,
        [ClaimType] nvarchar(200) NULL,
        [ClaimValue] nvarchar(200) NULL,
        CONSTRAINT [PK_UserClaims] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_UserClaims_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [identity].[Users] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20241006001424_CreateIdentitySchema'
)
BEGIN
    CREATE TABLE [identity].[UserLogins] (
        [LoginProvider] nvarchar(200) NOT NULL,
        [ProviderKey] nvarchar(200) NOT NULL,
        [ProviderDisplayName] nvarchar(200) NULL,
        [UserId] nvarchar(200) NOT NULL,
        CONSTRAINT [PK_UserLogins] PRIMARY KEY ([LoginProvider], [ProviderKey]),
        CONSTRAINT [FK_UserLogins_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [identity].[Users] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20241006001424_CreateIdentitySchema'
)
BEGIN
    CREATE TABLE [identity].[UserRoles] (
        [UserId] nvarchar(200) NOT NULL,
        [RoleId] nvarchar(200) NOT NULL,
        CONSTRAINT [PK_UserRoles] PRIMARY KEY ([UserId], [RoleId]),
        CONSTRAINT [FK_UserRoles_Roles_RoleId] FOREIGN KEY ([RoleId]) REFERENCES [identity].[Roles] ([Id]) ON DELETE CASCADE,
        CONSTRAINT [FK_UserRoles_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [identity].[Users] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20241006001424_CreateIdentitySchema'
)
BEGIN
    CREATE TABLE [identity].[UserTokens] (
        [UserId] nvarchar(200) NOT NULL,
        [LoginProvider] nvarchar(200) NOT NULL,
        [Name] nvarchar(200) NOT NULL,
        [Value] nvarchar(200) NULL,
        CONSTRAINT [PK_UserTokens] PRIMARY KEY ([UserId], [LoginProvider], [Name]),
        CONSTRAINT [FK_UserTokens_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [identity].[Users] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20241006001424_CreateIdentitySchema'
)
BEGIN
    CREATE INDEX [IX_RoleClaims_RoleId] ON [identity].[RoleClaims] ([RoleId]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20241006001424_CreateIdentitySchema'
)
BEGIN
    EXEC(N'CREATE UNIQUE INDEX [RoleNameIndex] ON [identity].[Roles] ([NormalizedName]) WHERE [NormalizedName] IS NOT NULL');
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20241006001424_CreateIdentitySchema'
)
BEGIN
    CREATE INDEX [IX_UserClaims_UserId] ON [identity].[UserClaims] ([UserId]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20241006001424_CreateIdentitySchema'
)
BEGIN
    CREATE INDEX [IX_UserLogins_UserId] ON [identity].[UserLogins] ([UserId]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20241006001424_CreateIdentitySchema'
)
BEGIN
    CREATE INDEX [IX_UserRoles_RoleId] ON [identity].[UserRoles] ([RoleId]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20241006001424_CreateIdentitySchema'
)
BEGIN
    CREATE INDEX [EmailIndex] ON [identity].[Users] ([NormalizedEmail]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20241006001424_CreateIdentitySchema'
)
BEGIN
    EXEC(N'CREATE UNIQUE INDEX [UserNameIndex] ON [identity].[Users] ([NormalizedUserName]) WHERE [NormalizedUserName] IS NOT NULL');
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20241006001424_CreateIdentitySchema'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20241006001424_CreateIdentitySchema', N'8.0.8');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20241018223855_CreateLinkEntity'
)
BEGIN
    CREATE TABLE [dbo].[Links] (
        [Id] int NOT NULL IDENTITY,
        [Url] nvarchar(200) NOT NULL,
        [FileItemId] int NOT NULL,
        [CreatedAt] datetime2 NOT NULL DEFAULT (GetDate()),
        [ValidUntil] datetime2 NOT NULL,
        [LastChanged] datetime2 NOT NULL,
        [UserId] nvarchar(200) NOT NULL,
        [IsActive] bit NOT NULL,
        [Name] nvarchar(200) NULL,
        [Description] nvarchar(200) NULL,
        [Display] AS [Name] PERSISTED,
        [ValidFrom] datetime2 GENERATED ALWAYS AS ROW START HIDDEN NOT NULL,
        [ValidTo] datetime2 GENERATED ALWAYS AS ROW END HIDDEN NOT NULL,
        [TimeStamp] rowversion NOT NULL,
        CONSTRAINT [PK_Links] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_Links_FileItem] FOREIGN KEY ([FileItemId]) REFERENCES [dbo].[FileItems] ([Id]) ON DELETE CASCADE,
        CONSTRAINT [FK_Links_User] FOREIGN KEY ([UserId]) REFERENCES [identity].[Users] ([Id]) ON DELETE CASCADE,
        PERIOD FOR SYSTEM_TIME([ValidFrom], [ValidTo])
    ) WITH (SYSTEM_VERSIONING = ON (HISTORY_TABLE = [dbo].[LinksAudit]));
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20241018223855_CreateLinkEntity'
)
BEGIN
    CREATE INDEX [IX_Links_FileItemId] ON [dbo].[Links] ([FileItemId]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20241018223855_CreateLinkEntity'
)
BEGIN
    CREATE UNIQUE INDEX [IX_Links_Url] ON [dbo].[Links] ([Url]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20241018223855_CreateLinkEntity'
)
BEGIN
    CREATE INDEX [IX_Links_UserId] ON [dbo].[Links] ([UserId]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20241018223855_CreateLinkEntity'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20241018223855_CreateLinkEntity', N'8.0.8');
END;
GO

COMMIT;
GO

