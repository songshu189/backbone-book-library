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
            var val =  $( el ).val();
            if( val != '' )
            {
                if( el.id === 'coverImage') {
                    formData[ el.id ] = 'img/' + val.replace(/^C:\\fakepath\\/i, '');
                } else if( el.id == 'keywords' ) {
                    var keywords = [];
                    _.each( val.split(' '), function(keyword) {
                        keywords.push({'keyword': keyword});
                    });
                    formData[ el.id ] = keywords;
                } else if (el.id == 'releaseDate') {
                    formData[ el.id ] = $('#releaseDate').datepicker('getDate').getTime();
                } else {
                    formData[ el.id ] = val;
                }
                console.log(formData[ el.id ] );

                // Clear input field value
                $( el).val('');
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