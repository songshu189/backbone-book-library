// site/js/views/library.js

var app = app || {};

app.LibraryView = Backbone.View.extend({
    el: '#books',

    initialize: function() {
        this.collection = new app.Library();
        this.collection.fetch({reset: true});   // NEW
        this.render();

        this.listenTo( this.collection, 'add', this.renderBook );
        this.listenTo( this.collection, 'reset', this.render ); // NEW
    },

    events:{
        'click #add':'addBook'
    },

    addBook: function( e ) {
        e.preventDefault();

        var formData = {};

        $( '#addBook div' ).children( 'input' ).each( function( i, el ) {
            if( $( el ).val() != '' )
            {
                if( el.id === 'coverImage') {
                    formData[ el.id ] = 'img/' + $( el ).val().replace(/^C:\\fakepath\\/i, '');
                } else {
                    formData[ el.id ] = $( el ).val();
                }
                console.log(formData[ el.id ] );
            }
        });

        this.collection.create( formData );
    },

    // render library by rendering each book in its collection
    render: function() {
        this.collection.each(function( item ) {
            this.renderBook( item );
        }, this );
    },

    // render a book by creating a BookView and appending the
    // element it renders to the library's element
    renderBook: function( item ) {
        var bookView = new app.BookView({
            model: item
        });
        this.$el.append( bookView.render().el );
    }
});