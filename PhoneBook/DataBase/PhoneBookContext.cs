using DataBase.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace DataBase
{
    public class PhoneBookContext : DbContext
    {
        public PhoneBookContext(DbContextOptions<PhoneBookContext> options)
            : base(options)
        {
        }

        public DbSet<UserDb> Users { get; set; }
        public DbSet<ContactDb> Contacts { get; set; }
        public DbSet<GroupDb> Groups { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserDb>()
                .HasKey(i => i.Id);
            modelBuilder.Entity<UserDb>()
                .HasMany(i => i.Contacts)
                .WithOne(i => i.User)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<UserDb>()
                .HasIndex(i => i.Email)
                .IsUnique();

            modelBuilder.Entity<ContactDb>()
                .HasKey(i => i.Id);
            modelBuilder.Entity<ContactDb>()
                .HasIndex(i => new {i.UserId, i.Name})
                .IsUnique();
            modelBuilder.Entity<ContactDb>()
                .HasMany(i => i.Phones)
                .WithOne(i => i.Contact)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<ContactDb>()
                .HasMany(i => i.PhoneCategories)
                .WithOne(i => i.Contact)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<ContactDb>()
                .HasMany(i => i.Addresses)
                .WithOne(i => i.Contact)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<ContactDb>()
                .HasMany(i => i.AddressCategories)
                .WithOne(i => i.Contact)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<PhoneDb>()
                .HasKey(i => i.Id);
            modelBuilder.Entity<PhoneDb>()
                .HasIndex(i => new {i.ContactId, i.Number})
                .IsUnique();

            modelBuilder.Entity<PhoneCategoryDb>()
                .HasKey(i => i.Id);
            modelBuilder.Entity<PhoneCategoryDb>()
                .HasMany(i => i.Phones)
                .WithOne(i => i.PhoneCategory)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<PhoneCategoryDb>()
                .HasIndex(i => new { i.ContactId, i.Name })
                .IsUnique();

            modelBuilder.Entity<AddressDb>()
                .HasKey(i => i.Id);
            modelBuilder.Entity<AddressDb>()
                .HasIndex(i => new { i.ContactId, i.Address })
                .IsUnique();

            modelBuilder.Entity<AddressCategoryDb>()
                .HasKey(i => i.Id);
            modelBuilder.Entity<AddressCategoryDb>()
                .HasMany(i => i.Addresses)
                .WithOne(i => i.AddressCategory)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<AddressCategoryDb>()
                .HasIndex(i => new { i.ContactId, i.Name })
                .IsUnique();

            modelBuilder.Entity<GroupDb>()
                .HasKey(i => i.Id);
            modelBuilder.Entity<GroupDb>()
                .HasIndex(i => i.UserId);
            modelBuilder.Entity<GroupDb>()
                .HasAlternateKey(i => new {i.UserId, i.Name});

            modelBuilder.Entity<ContactGroupDb>()
                .HasKey(i => new { SubscriberId = i.ContactId, i.GroupId });
            modelBuilder.Entity<ContactGroupDb>()
                .HasOne(i => i.ContactDb)
                .WithMany(i => i.ContactsGroups)
                .HasForeignKey(i => i.ContactId);
            modelBuilder.Entity<ContactGroupDb>()
                .HasOne(i => i.GroupDb)
                .WithMany(i => i.ContactsGroups)
                .HasForeignKey(i => i.GroupId);
        }
    }

    public class ApplicationContextFactory : IDesignTimeDbContextFactory<PhoneBookContext>
    {
        public PhoneBookContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<PhoneBookContext>();
            optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=PhoneBook;Username=postgres;Password=postgres");

            return new PhoneBookContext(optionsBuilder.Options);
        }
    }
}
