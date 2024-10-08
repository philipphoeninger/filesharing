﻿// <auto-generated />
using System;
using DAL.FileSharing.EFStructures;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace DAL.FileSharing._Migrations
{
    [DbContext(typeof(ApplicationDBContext))]
    [Migration("20241003205902_CreateSeriLogEntity")]
    partial class CreateSeriLogEntity
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("MODELS.FileSharing.Entities.FileItem", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreatedAt")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime2")
                        .HasDefaultValueSql("GetDate()");

                    b.Property<string>("Display")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)")
                        .HasComputedColumnSql("[Name]", true);

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<bool>("IsFolder")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bit")
                        .HasDefaultValue(false);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)");

                    b.Property<int?>("ParentId")
                        .HasColumnType("int");

                    b.Property<byte[]>("TimeStamp")
                        .IsConcurrencyToken()
                        .IsRequired()
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("rowversion");

                    b.Property<DateTime>("ValidFrom")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("datetime2")
                        .HasColumnName("ValidFrom");

                    b.Property<DateTime>("ValidTo")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("datetime2")
                        .HasColumnName("ValidTo");

                    b.HasKey("Id");

                    b.HasIndex("ParentId");

                    b.HasIndex(new[] { "Name", "ParentId" }, "IX_Items_Path")
                        .IsUnique()
                        .HasFilter("[ParentId] IS NOT NULL");

                    b.ToTable("FileItems", "dbo");

                    b.ToTable(tb => tb.IsTemporal(ttb =>
                            {
                                ttb.UseHistoryTable("FileItemsAudit");
                                ttb
                                    .HasPeriodStart("ValidFrom")
                                    .HasColumnName("ValidFrom");
                                ttb
                                    .HasPeriodEnd("ValidTo")
                                    .HasColumnName("ValidTo");
                            }));
                });

            modelBuilder.Entity("MODELS.FileSharing.Entities.SeriLogEntry", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("ActionName")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)");

                    b.Property<string>("ApplicationName")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)");

                    b.Property<string>("Exception")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)");

                    b.Property<string>("FilePath")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)");

                    b.Property<string>("Level")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)");

                    b.Property<int>("LineNumber")
                        .HasColumnType("int");

                    b.Property<string>("LogEvent")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)");

                    b.Property<string>("MachineName")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)");

                    b.Property<string>("MemberName")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)");

                    b.Property<string>("Message")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)");

                    b.Property<string>("MessageTemplate")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)");

                    b.Property<string>("Properties")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("Xml");

                    b.Property<string>("RequestPath")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)");

                    b.Property<string>("SourceContext")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)");

                    b.Property<DateTime>("TimeStamp")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime2")
                        .HasDefaultValueSql("GetDate()");

                    b.HasKey("Id");

                    b.ToTable("SeriLogs", "Logging");
                });

            modelBuilder.Entity("MODELS.FileSharing.Entities.FileItem", b =>
                {
                    b.HasOne("MODELS.FileSharing.Entities.FileItem", "ParentNavigation")
                        .WithMany("FileItems")
                        .HasForeignKey("ParentId")
                        .OnDelete(DeleteBehavior.ClientNoAction)
                        .HasConstraintName("FK_FileItems_Parents");

                    b.Navigation("ParentNavigation");
                });

            modelBuilder.Entity("MODELS.FileSharing.Entities.FileItem", b =>
                {
                    b.Navigation("FileItems");
                });
#pragma warning restore 612, 618
        }
    }
}
