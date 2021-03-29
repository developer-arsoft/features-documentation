ini home

@foreach($qr_codes as $key => $value)
<p>----======----</p>
<div class="visible-print text-center">
    {{ $value['uuid'] }}
    <br />
    {{ $value['qr'] }}
</div>
@endforeach

<p>----======----</p>
