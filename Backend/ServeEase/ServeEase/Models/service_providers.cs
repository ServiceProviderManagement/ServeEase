//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ServeEaseV3.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class service_providers
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public service_providers()
        {
            this.appointments = new HashSet<appointment>();
            this.reviews = new HashSet<review>();
        }
    
        public int sp_id { get; set; }
        public int user_id { get; set; }
        public string profession { get; set; }
        public Nullable<int> experience { get; set; }
        public string expertise { get; set; }
        public string description { get; set; }
        public Nullable<decimal> charges { get; set; }
        public string profile_pic { get; set; }
        public string other_images { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<appointment> appointments { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<review> reviews { get; set; }
        public virtual user user { get; set; }
    }
}
